export const COLUMNS = [
  {
    Header: "S/N",
    accessor: (row, index) => index + 1,
  },
  {
    Header: "Organization Name",
    accessor: "organization_name",
  },
  {
    Header: "Admin Name",
    accessor: "admin_name",
  },
  {
    Header: "Admin Phone",
    accessor: "admin_phone",
  },
  {
    Header: "Admin Email",
    accessor: "admin_email",
  },
  {
    Header: "Action",
    accessor: "",
  },
  {
    Header: "Country",
    accessor: "country",
  },
  {
    Header: "State",
    accessor: "state",
  },
  {
    Header: "Address",
    accessor: "address",
  },
  {
    Header: "Postal Code",
    accessor: "postal_code",
  },
  {
    Header: "DOI",
    accessor: "date_of_incorporation",
  },

  {
    Header: "Letter of Authorization",
    accessor: "letter_of_authorization_url",
  },
  {
    Header: "Identity Document",
    accessor: "admin_identity_document_url",
  },
  {
    Header: "Certificate of Incorporation",
    accessor: "certificate_of_incorporation_url",
  },
];
