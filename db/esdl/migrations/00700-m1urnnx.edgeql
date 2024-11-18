CREATE MIGRATION m1urnnxjisew4nx2qplfoerztfoshpqr76wcin33lqtkl4mdae4z4a
    ONTO m1xwesnkph6ts4cpn5i5a2ptcrzphxwdum23ymuzerllqe3fz7vuzq
{
  CREATE FUNCTION sys_core::getCodeSystem(sysName: std::str, codeTypeName: std::str, codeName: std::str) -> OPTIONAL sys_core::SysCode USING (SELECT
      std::assert_single(sys_core::SysCode FILTER
          (((.owner.name = sysName) AND (.codeType.name = codeTypeName)) AND (.name = codeName))
      )
  );
};
