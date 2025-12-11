
from datetime import time as time_type
class ParseUtils:
    @staticmethod
    def parse_time(time_str):
        try:
            if not time_str or time_str == '' or str(time_str).lower() == 'nan':
                return None
            time_str = str(time_str).strip()
            hour, minute = time_str.split(':')
            return time_type(int(hour), int(minute))
        except Exception as e:
            print(f"Error parsing time '{time_str}': {e}")
            return None

    @staticmethod
    def has_time_overlap(venue_open, venue_close, user_start, user_end):      
        return venue_open <= user_end and venue_close >= user_start

    @staticmethod
    def check_time_available(start_time, end_time, time_preference):
        if not time_preference:
            return True
        
        venue_open = ParseUtils.parse_time(start_time)
        venue_close = ParseUtils.parse_time(end_time)
        
        if not venue_open or not venue_close:
            return True
        
        time_ranges = {
            'morning': (time_type(5, 0), time_type(11, 0)),
            'noon': (time_type(11, 0), time_type(14, 0)),
            'afternoon': (time_type(14, 0), time_type(18, 0)),
            'evening': (time_type(18, 0), time_type(23, 0)),
            'night': (time_type(18, 0), time_type(23, 59)),
            'tonight': (time_type(18, 0), time_type(23, 59))
        }
        
        if time_preference not in time_ranges:
            return True
        
        user_start, user_end = time_ranges[time_preference]
        
        return ParseUtils.has_time_overlap(venue_open, venue_close, user_start, user_end)
    @staticmethod
    def pair_feature(parsed_query, venue_row):
        features = {
            'sport_match': 0,
            'location_match': 0,
            'time_match': 0
        }

        
        def get_value(row, keys):
            if hasattr(row, 'get'): 
                for key in keys:
                    val = row.get(key)
                    if val is not None:
                        return val
            elif hasattr(row, 'index'):  
                for key in keys:
                    if key in row.index:
                        val = row[key]
                        if val is not None and str(val).lower() != 'nan':
                            return val
            return None
        
        # Sport match - try different possible column names
        venue_sport = get_value(venue_row, ['categoryId'])
        venue_sport = str(venue_sport).lower().strip() 
        query_sport = str(parsed_query.get("category")).lower().strip()
        sport_match = 1 if venue_sport == query_sport else 0
        features['sport_match'] = sport_match
        # District match - try different possible column names
        venue_phuong = get_value(venue_row, ['phuong'])
        venue_phuong = str(venue_phuong).strip()     
        query_phuong = parsed_query.get("phuong")
        phuong_match = 1 if venue_phuong == query_phuong else 0
        
        venue_district = get_value(venue_row, ['district'])
        venue_district = str(venue_district).strip() 
        query_district = parsed_query.get("district")
        district_match = 1 if venue_district == query_district else 0

        venue_city = get_value(venue_row, ['city'])
        venue_city = str(venue_city).strip()      
        query_city = parsed_query.get("city").strip() 
        city_match = 1 if  venue_city == query_city else 0

        # Weighted location score
        if query_phuong:
            # User specified ward → most accurate
            location_match = phuong_match * 3
        elif query_district:
            # No ward → fallback to district
            location_match = district_match * 2
        else:
            # Only city → lowest accuracy
            location_match = city_match * 1

        features['location_match'] = location_match


        # Time match - try different possible column names
        start_time = get_value(venue_row, ['start_time'])
        end_time = get_value(venue_row, ['end_time'])
        
        time_match = 1 if ParseUtils.check_time_available(start_time, end_time, parsed_query.get("time")) else 0
        features['time_match'] = time_match
        
        return features
