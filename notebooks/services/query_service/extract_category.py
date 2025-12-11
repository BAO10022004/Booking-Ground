import pandas as pd
import unidecode

class ExtractSport:

    # Map cứng categoryId và tên môn
    CATEGORY_MAP = {
        "cau long": {
            "name": "Cầu lông",
            "categoryId": "a1f3b6e4-2c9a-4c1b-b8a2-9c0d4fe71201"
        },
        "pickleball": {
            "name": "Pickleball",
            "categoryId": "e3a7b9d9-5c2f-4d33-b4c4-33f1d765cd02"
        },
        "bong ro": {
            "name": "Bóng Rổ",
            "categoryId": "e3a7b9d9-5c2f-4d33-b4c4-33f1d765cd03"
        },
        "tennis": {
            "name": "Tennis",
            "categoryId": "e3a7b9d9-5c2f-4d33-b4c4-33f1d765cd04"
        },
        "bong chuyen": {
            "name": "Bóng Chuyền",
            "categoryId": "e3a7b9d9-5c2f-4d33-b4c4-33f1d765cd05"
        },
        "bong da": {
            "name": "Bóng Đá",
            "categoryId": "e3a7b9d9-xxxxx-xxxxx-xxxxx-xxxxxxxxxxxx"
        }
    }

    # Từ khóa mở rộng để bắt lỗi chính tả
    KEYWORDS = {
        "cau long": ["cau long", "caulong", "cầu lông", "caau long"],
        "pickleball": ["pickleball", "pick ball", "pik bo", "pic bo"],
        "bong ro": ["bong ro", "bong rô", "bongro", "bong rõ"],
        "tennis": ["tennis", "tenis"],
        "bong chuyen": ["bong chuyen", "bong chuyền", "bong chyen", "bong chuyenf"],
        "bong da": ["bong da", "bóng đá", "da banh", "đa banh", "football"]
    }

    @staticmethod
    def normalize(text):
        """ Chuẩn hóa chuỗi: bỏ dấu + lower """
        text = unidecode.unidecode(text.lower())
        return text

    @staticmethod
    def extract_from_text(text):
        if not isinstance(text, str):
            return None

        text_norm = ExtractSport.normalize(text)

        # Dò từng từ khóa
        for key, synonyms in ExtractSport.KEYWORDS.items():
            for kw in synonyms:
                if kw in text_norm:
                    cate = ExtractSport.CATEGORY_MAP[key]
                    return cate["categoryId"]

        return None

    @staticmethod
    def extract_category_from_df(df):
        df = df.copy()

        df["category"] = None

        for idx, row in df.iterrows():
            id = ExtractSport.extract_from_text(row["query"])
            df.at[idx, "category"] = id

        return df
 