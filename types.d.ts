export type ResponseDtoProps = {
  code: string;
  message: string;
};

export type NumberOfPropertiesProp = {
  PROLAN: number;
  PROSHO: number;
  PROAPA: number;
};

export type ImgDocType = {
  id: number;
  version: number;
  delFlag: string;
  createdOn: string;
  modifiedOn: string;
  imageUrl: string;
};

export type PropertyResponseProps = {
  id: number;
  amount: number;
  description: string;
  currency: string;
  imageUrl: string;
  productCode: string;
  code: string;
  location: string;
  productCategoryCode: string;
  recent: string;
  multipartFile: string;
  productCodeList: any;
  productSize: string;
  price: string;
  multipartFileList: any;
  imagesList: ImgDocType[];
  availableQuantity: any;
  landDocs: any;
  percentageDiscount: string;
  landDoc: ImgDocType[];
  videoList: any;
};

export type GetPropertiesResponseProps = {
  responseDto: ResponseDtoProps;
  productDescriptionDtoList: PropertyResponseProps[];
};

export type GetAPropertyResponseProps = {
  responseDto: ResponseDtoProps;
  productDescriptionDto: PropertyResponseProps;
};

export type UploadTransactionResponseProps = {
  responseDto: ResponseDtoProps;
  transactionList: null;
  transactionDto: null;
  transaction: null;
};

// export interface TransactionListProps {
//   currency: string;
//   userName: null;
//   descriptionCodeList: null;
//   reference: string;
//   id: number;
//   amount: string;
//   multipartFile: null;
//   imageUrl: string;
//   transactionStatus: string;
//   descriptionCode: string;
//   productDescriptionId: null;
//   transactionId: null;
//   reasonForRejection: string;
// }
export interface TransactionsListProps {
  currency: string;
  id: number;
  amount: string;
  transactionStatus: string;
  descriptionCode: string;
  imageList: {
    id: number;
    version: number;
    delFlag: string;
    createdOn: string;
    modifiedOn: string;
    imageUrl: string;
  }[];
}

export interface AllTransactionsProps {
  responseDto: ResponseDtoProps;
  transactionList: TransactionsListProps[];
  transactionDto: null;
  transaction: null;
}
