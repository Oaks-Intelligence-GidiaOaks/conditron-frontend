import {
  Header,
  DashboardMenu,
  Banner,
  // DashboardVariations,
} from "../../components/layout";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useTopValuedAssetsQuery } from "../../service/assets.service";
import { img_box } from "../../assets";

function Index() {
  const { data: topAssets, isLoading, refetch } = useTopValuedAssetsQuery();
  console.log(topAssets);

  return (
    <>
      <Header />
      <DashboardMenu />
      {/* <DashboardVariations /> */}
      <Banner
        text1="Hi, oaksintelligence"
        text2="Welcome to Conditron"
        text3="page 2 Account Verified."
      />
      <div className="container">
        <div className="row justify-content-center pt-4 pb-4">
          <div className="col-lg-10">
            <div className="card shadow">
              <div className="card-header bg-white">Top Valued Assets</div>
              <div className="card-body">
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">Asset Name</th>
                      <th scope="col">Qty</th>
                      <th scope="col">Value</th>
                      <th scope="col">%Change(Qty)</th>
                    </tr>
                  </thead>
                  <tbody className="align-items-center">
                    {topAssets &&
                      topAssets.assets.map((asset) => (
                        <tr key={asset._id}>
                          <td>
                            <div className="d-flex gap-3">
                              <div className="img-box h-25">
                                {asset.asset_image_url ? (
                                  asset.asset_image_url
                                ) : (
                                  <img src={img_box} className="img-fluid" />
                                )}
                              </div>
                              <div className="block">
                                <p className="lead mb-0 pb-0">
                                  {asset.asset_type}
                                </p>
                                <p className="text-muted text-sm">
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit.
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>{"32"}</td>
                          <td>{asset.asset_value}</td>
                          <td>
                            20%{" "}
                            <svg
                              width="16"
                              height="18"
                              viewBox="0 0 16 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.059 8.96917C14.8353 9.19282 14.5371 9.30464 14.2389 9.30464C13.9035 9.30464 13.6053 9.19282 13.3816 8.96917L9.46775 5.0553V16.4614C9.46775 17.1324 8.90862 17.6542 8.27495 17.6542C7.67855 17.6542 7.08215 17.1324 7.08215 16.4614V5.0553L3.13101 8.96917C2.68371 9.45374 1.90094 9.45374 1.45364 8.96917C0.969064 8.52187 0.969064 7.73909 1.45364 7.29179L7.41763 1.32781C7.86493 0.843233 8.6477 0.843233 9.095 1.32781L15.059 7.29179C15.5436 7.73909 15.5436 8.52187 15.059 8.96917Z"
                                fill="#49AA4C"
                              />
                            </svg>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
