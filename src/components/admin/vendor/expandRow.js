import React from "react";

const ExpandedRow = ({ company, comments }) => {
  return (
    <tr>
      <td colSpan="9" className="expanded-row">
        <div className="row">
          <div className="col-md-6">
            <table className="table table-bordered">
              <tbody>
                {[
                  { label: "Comment", value: company.comment },
                  { label: "Communication Through", value: company.communicatethrough },
                  { label: "Contact No", value: company.contact_no },
                  { label: "Contact Person Designation", value: company.contact_person_designation },
                  { label: "Contact Person Email", value: company.contact_person_email },
                  { label: "Current Position", value: company.currentposition },
                ].map(({ label, value }) => (
                  <tr key={label}>
                    <td className="font-weight-bold">{label}:</td>
                    <td>{value || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-md-6">
            <table className="table table-bordered">
              <tbody>
                {[
                  { label: "Follow Up", value: company.followup },
                  { label: "Website URL", value: company.website_url, isLink: true },
                  { label: "Industry Sector", value: company.industry_sector },
                  { label: "Description", value: company.description },
                ].map(({ label, value, isLink }) => (
                  <tr key={label}>
                    <td className="font-weight-bold">{label}:</td>
                    <td>
                      {isLink ? (
                        <a href={value} target="_blank" rel="noopener noreferrer">
                          {value}
                        </a>
                      ) : (
                        value || "N/A"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-md-12 mt-3">
            <strong>Comments:</strong>
            {comments[company.id] ? (
              comments[company.id].length > 0 ? (
                <table className="table table-bordered mt-2">
                  <thead>
                    <tr className="table-secondary">
                      <th>#</th>
                      <th>Comment</th>
                      <th>Follow Up Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comments[company.id].map((comment, index) => (
                      <tr key={comment.id}>
                        <td>{index + 1}</td>
                        <td>{comment.comment}</td>
                        <td>
                          <em>
                            {new Date(comment.created_date).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </em>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No comments available.</p>
              )
            ) : (
              <p>Loading comments...</p>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
};

export default ExpandedRow;
