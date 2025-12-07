import re


class Detect:
    
    @staticmethod
    def  detect_sport(parsed, query_text):
        sport_keywords = {
            "badminton": ["cau long", "cầu lông", "badminton"],
            "pickleball": ["pickleball", "pickle"],
            "basketball": ["bong ro", "bóng rổ", "basketball"],
            "tennis": ["tennis"],
            "volleyball": ["bong chuyen", "bóng chuyền", "volleyball"],
            "football": ["bong da", "bóng đá", "futsal", "football"]
        }
        query_lower = query_text.lower()
        for sport, keywords in sport_keywords.items():
            if any(kw in query_lower for kw in keywords): 
                parsed['sport'] = sport
                break
    @staticmethod
    def  detect_district(parsed, query_text):
        query_lower = query_text.lower()
        district_pattern = r'quận\s*(\d+)'
        district_match = re.search(district_pattern, query_lower)
        if district_match:
            parsed['district'] = f'Quận {district_match.group(1)}'
        
        # Pattern 2: Quận + tên (Quận Ba Đình, Quận Thủ Đức, Quận Tân Bình...)
        if not parsed['district']:
            # Match Vietnamese characters including spaces
            quan_pattern = r'quận\s+([a-záàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ\s]+?)(?:\s|$|,|\.)'
            quan_match = re.search(quan_pattern, query_lower)
            if quan_match:
                quan_name = quan_match.group(1).strip()
                # Remove trailing common words that might be captured
        
        # Pattern 2: Huyện + tên (Huyện Nhà Bè, Huyện Củ Chi)
        if not parsed['district']:
            huyen_pattern = r'huyện\s+([a-záàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ\s]+)'
            huyen_match = re.search(huyen_pattern, query_lower)
            if huyen_match:
                huyen_name = huyen_match.group(1).strip().title()
                parsed['district'] = f'Huyện {huyen_name}'
        
        # Pattern 3: Phường + tên (Phường Bến Nghé, Phường 1)
        if not parsed['district']:
            phuong_patterns = [
                r'phường\s+(\d+)',  # Phường 1, Phường 12
                r'phường\s+([a-záàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ\s]+)'  # Phường Bến Nghé
            ]
            for pattern in phuong_patterns:
                phuong_match = re.search(pattern, query_lower)
                if phuong_match:
                    phuong_name = phuong_match.group(1).strip()
                    if phuong_name.isdigit():
                        parsed['district'] = f'Phường {phuong_name}'
                    else:
                        parsed['district'] = f'Phường {phuong_name.title()}'
                    break
        # Pattern 4: Xã + tên (Xã Phước Kiển)
        if not parsed['district']:
            xa_pattern = r'xã\s+([a-záàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ\s]+)'
            xa_match = re.search(xa_pattern, query_lower)
            if xa_match:
                xa_name = xa_match.group(1).strip().title()
                parsed['district'] = f'Xã {xa_name}'
    @staticmethod
    def  detect_time(parsed, query_text):
        query_lower = query_text.lower()
        time_keywords = {
            'sáng': 'morning',
            'morning': 'morning',
            'trưa': 'noon',
            'noon': 'noon',
            'chiều': 'afternoon',
            'afternoon': 'afternoon',
            'tối': 'evening',
            'evening': 'evening',
            'đêm': 'night',
            'night': 'night'
        }
        
        for keyword, time_pref in time_keywords.items():
            if keyword in query_lower:
                parsed['time'] = time_pref
                break