import unidecode

from services.query_service.extract_category import ExtractSport


class ExtractCategory:
    KEYWORDS = {
            "1": ["cau long", "caulong", "cầu lông", "caau long, Cầu lông"],
            "2": ["pickleball", "pick ball", "pik bo", "pic bo", "Pickleball"],
            "3": ["bong ro", "bong rô", "bongro", "bong rõ", "Bóng Rổ"  ],
            "4": ["tennis", "tenis",  "Tennis"],
            "5": ["bong chuyen", "bong chuyền", "bong chyen", "bong chuyenf", "Bóng chuyển"],
            "6": ["bong da", "bóng đá", "da banh", "đa banh", "football"]
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

        # text_norm = ExtractCategory.normalize(text)

        for key, synonyms in ExtractCategory.KEYWORDS.items():
            for kw in synonyms:
                if kw in text:
                    return key

        return None

    @staticmethod
    def extract_category_from_df(df):
        df = df.copy()

        df["category"] = None

        for idx, row in df.iterrows():
            id = ExtractSport.extract_from_text(row["category"])
            df.at[idx, "category"] = id

        return df
 