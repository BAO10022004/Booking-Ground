import json
import os
import pandas as pd
import re

class ExtractLocation:
    @staticmethod
    def extract_locations_to_dataframe(text):

        if not isinstance(text, str) or pd.isna(text):
            return pd.DataFrame([{"phuong": "", "district": "", "city": ""}])

        text = text.lower()

        base = os.path.dirname(__file__)

        with open(os.path.join(base, "province.json"), "r", encoding="utf-8") as f:
            provinces = json.load(f)

        with open(os.path.join(base, "district.json"), "r", encoding="utf-8") as f:
            districts = json.load(f)

        with open(os.path.join(base, "ward.json"), "r", encoding="utf-8") as f:
            wards = json.load(f)

        result = {"phuong": "", "district": "", "city": ""}
        if('quận 2' in text):
              text =  text.replace('quận 2', 'thành phố thủ đức')
        if('quận 9' in text):
              text =    text.replace('quận 9', 'thành phố thủ đức')
        if('quận thủ đức' in text):
              text =    text.replace('quận thủ đức', 'thành phố thủ đức')        
        # ===== ƯU TIÊN 1: PHƯỜNG/XÃ =====
        if 'phường' in text or 'xã' in text or 'thị trấn' in text:
            for code, w in wards.items():
                name = w["name"].lower()
                name_full = w["name_with_type"].lower()

                if name in text or name_full in text:
                    result["phuong"] = w["name"]

                    district_code = w["parent_code"]
                    district = districts[district_code]
                    result["district"] = district["name"]

                    city_code = district["parent_code"]
                    city = provinces[city_code]
                    result["city"] = city["name"]

                    return pd.DataFrame([result])
        # ===== ƯU TIÊN 2: QUẬN/HUYỆN =====
        if 'quận' in text or 'huyện' in text  or 'thành phố' in text:
            for code, d in districts.items():
                name = d["name"].lower()
                name_full = d["name_with_type"].lower()

                if name in text or name_full in text:
                    result["district"] = d["name"]

                    city_code = d["parent_code"]
                    city = provinces[city_code]
                    result["city"] = city["name"]

                    return pd.DataFrame([result])
        # ===== ƯU TIÊN 3: TỈNH/THÀNH PHỐ =====
        if 'tỉnh' in text or 'thành phố' in text:
            for code, p in provinces.items():
                name = p["name"].lower()
                name_full = p["name_with_type"].lower()

                if name in text or name_full in text:
                    result["city"] = p["name"]
                    return pd.DataFrame([result])

        

        return pd.DataFrame([result])


    @staticmethod
    def merge_query_with_locations(df_query):
        result_rows = []

        for idx, row in df_query.iterrows():
            query_text = row.get('query', '')

            # Extract location
            df_locations = ExtractLocation.extract_locations_to_dataframe(query_text)

            # Trường hợp không có location nào
            if df_locations is None or len(df_locations) == 0:
                new_row = row.to_dict()
                new_row.update({
                    'phuong': '',
                    'district': '',
                    'city': ''
                })
                result_rows.append(new_row)
                continue

            # Có 1 hoặc nhiều location
            for _, loc_row in df_locations.iterrows():
                new_row = row.to_dict()
                new_row.update({
                    'phuong': loc_row.get('phuong', ''),
                    'district': loc_row.get('district', ''),
                    'city': loc_row.get('city', '')
                })
                result_rows.append(new_row)

        return pd.DataFrame(result_rows)
