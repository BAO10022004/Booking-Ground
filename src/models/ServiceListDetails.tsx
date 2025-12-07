/**
 * Model cho bảng SERVICELISTDETAILS
 * Bảng chi loại mặt hàng - chứa thông tin chi tiết về các loại dịch vụ
 */

export class ServiceListDetails {
  /**
   * Mã dịch vụ chi tiết (duy nhất)
   * Primary Key
   */
  serviceListDetailID: string;

  /**
   * Tên dịch vụ
   * VD: Cầu hải yến, nước revive...
   * Max length: 100 characters
   */
  name: string;

  /**
   * Giá bán sỉ
   * VD: 20.000 đ
   * Max length: 50 characters
   */
  wholesale: string;

  /**
   * Đơn vị bán sỉ
   * VD: 1 thùng
   * Max length: 50 characters
   */
  unitWholesale: string;

  /**
   * Giá bán lẻ
   * VD: 20.000 đ
   * Max length: 50 characters
   */
  retail: string;

  /**
   * Đơn vị bán lẻ
   * VD: 1 chai
   * Max length: 50 characters
   */
  unitRetail: string;

  /**
   * Tham chiếu đến ServiceList.ServiceListID
   * Foreign Key - Danh sách dịch vụ cha
   */
  serviceListID: string;

  constructor(
    serviceListDetailID: string = '',
    name: string = '',
    wholesale: string = '',
    unitWholesale: string = '',
    retail: string = '',
    unitRetail: string = '',
    serviceListID: string = ''
  ) {
    this.serviceListDetailID = serviceListDetailID;
    this.name = name;
    this.wholesale = wholesale;
    this.unitWholesale = unitWholesale;
    this.retail = retail;
    this.unitRetail = unitRetail;
    this.serviceListID = serviceListID;
  }

  /**
   * Khởi tạo từ object
   */
  static fromJSON(json: any): ServiceListDetails {
    return new ServiceListDetails(
      json.serviceListDetailID || json.ServiceListDetailID || '',
      json.name || json.Name || '',
      json.wholesale || json.Wholesale || '',
      json.unitWholesale || json.UnitWholesale || '',
      json.retail || json.Retail || '',
      json.unitRetail || json.UnitRetail || '',
      json.serviceListID || json.ServiceListID || ''
    );
  }

  /**
   * Chuyển đổi sang object JSON
   */
  toJSON(): object {
    return {
      serviceListDetailID: this.serviceListDetailID,
      name: this.name,
      wholesale: this.wholesale,
      unitWholesale: this.unitWholesale,
      retail: this.retail,
      unitRetail: this.unitRetail,
      serviceListID: this.serviceListID
    };
  }

  /**
   * Kiểm tra tính hợp lệ của dữ liệu
   */
  isValid(): boolean {
    return (
      this.name.trim() !== '' &&
      this.wholesale.trim() !== '' &&
      this.unitWholesale.trim() !== '' &&
      this.retail.trim() !== '' &&
      this.unitRetail.trim() !== '' &&
      this.serviceListID.trim() !== ''
    );
  }

  /**
   * Kiểm tra độ dài các trường
   */
  validateLength(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (this.name.length > 100) {
      errors.push('Tên dịch vụ không được vượt quá 100 ký tự');
    }
    if (this.wholesale.length > 50) {
      errors.push('Giá bán sỉ không được vượt quá 50 ký tự');
    }
    if (this.unitWholesale.length > 50) {
      errors.push('Đơn vị bán sỉ không được vượt quá 50 ký tự');
    }
    if (this.retail.length > 50) {
      errors.push('Giá bán lẻ không được vượt quá 50 ký tự');
    }
    if (this.unitRetail.length > 50) {
      errors.push('Đơn vị bán lẻ không được vượt quá 50 ký tự');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Clone object
   */
  clone(): ServiceListDetails {
    return new ServiceListDetails(
      this.serviceListDetailID,
      this.name,
      this.wholesale,
      this.unitWholesale,
      this.retail,
      this.unitRetail,
      this.serviceListID
    );
  }
}

/**
 * DTO cho việc tạo mới ServiceListDetails
 */
export class CreateServiceListDetailsDTO {
  name: string;
  wholesale: string;
  unitWholesale: string;
  retail: string;
  unitRetail: string;
  serviceListID: string;

  constructor(
    name: string,
    wholesale: string,
    unitWholesale: string,
    retail: string,
    unitRetail: string,
    serviceListID: string
  ) {
    this.name = name;
    this.wholesale = wholesale;
    this.unitWholesale = unitWholesale;
    this.retail = retail;
    this.unitRetail = unitRetail;
    this.serviceListID = serviceListID;
  }

  toServiceListDetails(): ServiceListDetails {
    return new ServiceListDetails(
      '',
      this.name,
      this.wholesale,
      this.unitWholesale,
      this.retail,
      this.unitRetail,
      this.serviceListID
    );
  }
}

/**
 * DTO cho việc cập nhật ServiceListDetails
 */
export class UpdateServiceListDetailsDTO {
  serviceListDetailID: string;
  name?: string;
  wholesale?: string;
  unitWholesale?: string;
  retail?: string;
  unitRetail?: string;
  serviceListID?: string;

  constructor(
    serviceListDetailID: string,
    name?: string,
    wholesale?: string,
    unitWholesale?: string,
    retail?: string,
    unitRetail?: string,
    serviceListID?: string
  ) {
    this.serviceListDetailID = serviceListDetailID;
    this.name = name;
    this.wholesale = wholesale;
    this.unitWholesale = unitWholesale;
    this.retail = retail;
    this.unitRetail = unitRetail;
    this.serviceListID = serviceListID;
  }
}

/**
 * Response từ API
 */
export class ServiceListDetailsResponse {
  success: boolean;
  data?: ServiceListDetails | ServiceListDetails[];
  message?: string;
  error?: string;

  constructor(
    success: boolean,
    data?: ServiceListDetails | ServiceListDetails[],
    message?: string,
    error?: string
  ) {
    this.success = success;
    this.data = data;
    this.message = message;
    this.error = error;
  }

  static success(data: ServiceListDetails | ServiceListDetails[], message?: string): ServiceListDetailsResponse {
    return new ServiceListDetailsResponse(true, data, message);
  }

  static error(error: string): ServiceListDetailsResponse {
    return new ServiceListDetailsResponse(false, undefined, undefined, error);
  }
}