export interface MyLor {
  id: string;
  title: string;
  content: string;
  filesPath: string[];

  createdBy: string;
  createdOn: string;

  reviewedBy: any;
  isreviewed: string;
  reviewedOn: string;

  acceptedBy: any;
  isaccepted: string;
  acceptedOn: string;

  rejectedBy: any;
  isrejected: string;
  rejectedOn: string;

  review: string;
  isassigned: string;
  assignedTo: string;
}
