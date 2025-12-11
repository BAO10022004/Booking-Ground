import re
import pandas as pd
class DetectDistrict:
    #-----------------------------------Lấy ra xã , Phường ------------------------------------#
    @staticmethod
    def get_ward_info(row):
        if 'phuong' not in row.index or pd.isna(row['phuong']):
            return ''
        
        ward = str(row['phuong']).strip()        
        ward = re.sub(r'^(Phường|phường|PHƯỜNG|Xã|xã|XÃ|Ward|ward|WARD)\s+', '', ward)
        
        return ward.strip()
    #-----------------------------------Lấy ra huyện ,quận, thành phố   ------------------------------------#
    @staticmethod
    def get_district_info(row):
        district = None
        for col in ['quan', 'huyen','district' ]:
            if col in row.index and pd.notna(row[col]):
                district = str(row[col]).strip()
                break      
        if not district:
            return ''
        district = re.sub(r'^(Quận|quận|QUẬN|Huyện|huyện|HUYỆN|Thành phố|thành phố|THÀNH PHỐ|TP\.|tp\.|Tp.|TP|Tp|tp|District|district|DISTRICT|City|city|CITY)\s+', '', district)

        
        return district.strip()
    #-----------------------------------Lấy ra huyện ,quận, thành phố   ------------------------------------#
    

    def get_ward_info(row):
        """
        Lấy thông tin phường/xã từ cột 'phuong', bỏ tiền tố 'Phường' hoặc 'Xã'
        
        Parameters:
        -----------
        row : pandas.Series
            Một dòng từ DataFrame chứa cột 'phuong'
            
        Returns:
        --------
        str : Tên phường/xã đã được làm sạch (bỏ tiền tố)
        
        Examples:
        ---------
        >>> df = pd.DataFrame({'phuong': ['Phường 21', 'Xã Tân Phú', 'Phường Bến Nghé']})
        >>> get_ward_info(df.iloc[0])
        '21'
        >>> get_ward_info(df.iloc[1])
        'Tân Phú'
        """
        if 'phuong' not in row.index or pd.isna(row['phuong']):
            return ''
        
        ward = str(row['phuong']).strip()
        
        # Loại bỏ các tiền tố phường, xã (không phân biệt hoa thường)
        import re
        ward = re.sub(r'^(Phường|phường|PHƯỜNG|Xã|xã|XÃ|Ward|ward|WARD)\s+', '', ward)
        
        return ward.strip()


    def get_district_info(row):
        """
        Lấy thông tin quận/huyện/thành phố, bỏ tiền tố 'Quận', 'Huyện', 'Thành phố'
        
        Parameters:
        -----------
        row : pandas.Series
            Một dòng từ DataFrame chứa cột 'quan', 'huyen' hoặc 'district'
            
        Returns:
        --------
        str : Tên quận/huyện/thành phố đã được làm sạch (bỏ tiền tố)
        
        Examples:
        ---------
        >>> df = pd.DataFrame({'quan': ['Quận 7', 'Huyện Củ Chi', 'Thành phố Thủ Đức']})
        >>> get_district_info(df.iloc[0])
        '7'
        >>> get_district_info(df.iloc[2])
        'Thủ Đức'
        """
        import re
        
        # Thử tìm trong cột 'quan', 'huyen' hoặc 'district'
        district = None
        for col in ['quan', 'huyen', 'district']:
            if col in row.index and pd.notna(row[col]):
                district = str(row[col]).strip()
                break
        
        if not district:
            return ''
        
        # Loại bỏ các tiền tố quận, huyện, thành phố (không phân biệt hoa thường)
        district = re.sub(r'^(Quận|quận|QUẬN|Huyện|huyện|HUYỆN|Thành phố|thành phố|THÀNH PHỐ|TP\.|tp\.|District|district|DISTRICT|City|city|CITY)\s+', '', district)
        
        return district.strip()


    def get_city_info(row):  
        city = None
        for col in ['city', 'tinh', 'thanh_pho', 'province']:
            if col in row.index and pd.notna(row[col]):
                city = str(row[col]).strip()
                break      
        if not city:
            return ''
        city = re.sub(r'^(Thành phố|thành phố|THÀNH PHỐ|TP\.|tp\.|TP|Tỉnh|tỉnh|TỈNH|Province|province|PROVINCE|City|city|CITY)\s+', '', city)
        
        return city.strip()