"""
Parse utilities for venue recommendation system
File: services/parse_user_query.py

Pure Python utility functions - no external dependencies except datetime and re
"""

from datetime import time as time_type
import re

from services.detect import Detect


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
    def parse_user_query(query_text):
        if not isinstance(query_text, str):
            query_text = str(query_text)
        
        query_lower = query_text.lower()
        
        parsed = {
            'time': None,
            'raw_text': query_text,
            'sport': None,
            'district': None,
            'max_price': None,
            'min_rating': None,
            'keywords': []
        }
        
        # Detect sport
        Detect.detect_sport(parsed=parsed, query_text=query_text)
        
        # Detect district (Quận, Huyện, Phường, Xã)
        Detect.detect_district(parsed=parsed, query_text=query_text)
        
        # Detect price
        # price_patterns = [
        #     r'(\d+)k',
        #     r'dưới\s*(\d+)',
        #     r'(\d+)\s*(?:nghìn|ngàn)'
        # ]
        # for pattern in price_patterns:
        #     price_match = re.search(pattern, query_lower)
        #     if price_match:
        #         parsed['max_price'] = int(price_match.group(1)) * 1000
        #         break
        
        # Detect quality requirements
        # if 'tốt' in query_lower or 'chất lượng' in query_lower:
        #     parsed['min_rating'] = 4.0
        
        # Detect time preference
        Detect.detect_time(parsed=parsed, query_text=query_text)
        
        # Extract keywords
        # keywords = ['gần', 'rẻ', 'chất lượng', 'đẹp', 'sạch']
        # parsed['keywords'] = [kw for kw in keywords if kw in query_lower]
        
        return parsed

    @staticmethod
    def pair_feature(parsed_query, venue_row):
        features = []
        
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
        venue_sport = get_value(venue_row, ['sport', 'Sport', 'sport_type', 'Sport_Type'])
        venue_sport = str(venue_sport).lower().strip() if venue_sport else None
        
        query_sport = str(parsed_query.get("sport") or "").lower().strip()
        sport_match = 1 if query_sport and venue_sport and venue_sport == query_sport else 0
        features.append(sport_match)
        
        # District match - try different possible column names
        venue_district = get_value(venue_row, ['district', 'District', 'District_Name'])
        venue_district = str(venue_district).strip() if venue_district else None
        
        query_district = parsed_query.get("district")
        district_match = 1 if query_district and venue_district and venue_district == query_district else 0
        features.append(district_match)
        
        # Time match - try different possible column names
        start_time = get_value(venue_row, ['start_time', 'Start_Time', 'opening_time', 'Opening_Time'])
        end_time = get_value(venue_row, ['end_time', 'End_Time', 'closing_time', 'Closing_Time'])
        
        time_match = 1 if ParseUtils.check_time_available(start_time, end_time, parsed_query.get("time")) else 0
        features.append(time_match)
        
        return features


# Test code
if __name__ == "__main__":
    # Test parsing
    test_queries = [
        "tìm sân cầu lông quận 1",
        "sân bóng đá huyện Nhà Bè giá rẻ",
        "pickleball phường 5 buổi tối",
    ]
    
    print("=== Testing ParseUtils ===\n")
    for query in test_queries:
        parsed = ParseUtils.parse_user_query(query)
        print(f"Query: {query}")
        print(f"Parsed: {parsed}\n")