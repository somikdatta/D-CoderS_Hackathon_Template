export interface MyLor {
  id: string;
  title: string;
  content: string;
  filesPath: string[];

  createdBy: string;
  createdOn: string;

  reviewedBy: string;
  isreviewed: string;
  reviewedOn: string;

  acceptedBy: string;
  isaccepted: string;
  acceptedOn: string;

  rejectedBy: string;
  isrejected: string;
  rejectedOn: string;
}
