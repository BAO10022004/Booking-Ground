class ExtractTime:
    @staticmethod
    def extract_time_from_df(df):
        df = df.copy()
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
        df["time"] = None

        for idx, row in df.iterrows():
            text = row["query"].lower()
            for keyword, time_pref in time_keywords.items():
                if keyword in text:
                       df.at[idx, "time"] = time_pref

        return df