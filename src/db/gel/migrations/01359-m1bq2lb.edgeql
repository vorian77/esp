CREATE MIGRATION m1bq2lbqpep4cxyxt3mdpgxbpafbe7u4tgz7d6pj7xpkgw6h26fyxq
    ONTO m1hof4rragqxtt3oxzkpzjrwas6ndmdgzv4ckcgoezk675dis7dzca
{
  CREATE FUNCTION sys_core::getEligibility(name: std::str) -> OPTIONAL sys_core::SysEligibility USING (SELECT
      std::assert_single((SELECT
          sys_core::SysEligibility
      FILTER
          (.name = name)
      ))
  );
};
