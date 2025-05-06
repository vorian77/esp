CREATE MIGRATION m152pd7vq4f7khozg6k2d3vhmjfy3bewvb7lurduztxrbgdo2xqdrq
    ONTO m1xnd43q7pa7euxzb5coo46xzcfgyxxibzcj72qifep2swk63u26qq
{
  ALTER TYPE app_cm::CmClient {
      ALTER PROPERTY hasDriversLicense {
          SET TYPE std::str USING ({'No'});
      };
  };
};
