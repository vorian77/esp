CREATE MIGRATION m12ay5p3g4bzsbuhpwhk7ehqovoyqut7lhvxfeqdq3anvo56bv2suq
    ONTO m146u46f5hvivic5nnbm5avuwkuqa6pfo7x5ksvg7yq3xirnytv4xa
{
  ALTER TYPE sys_core::SysOrg {
      ALTER PROPERTY logoWidth {
          SET TYPE std::float64;
      };
  };
};
