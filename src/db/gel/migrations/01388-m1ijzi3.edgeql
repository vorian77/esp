CREATE MIGRATION m1ijzi3tkgj3so6gr6ncqjwapcuv2qevshxz6olntolugq345mmr7a
    ONTO m1chbjyi5ps4ssvca7brwz5k23fbxzqwtbrp3n34r3msib5cvwyw7a
{
  ALTER TYPE app_cm::CmCsfEligibility {
      DROP LINK eligibility;
  };
  ALTER TYPE app_cm::CmCsfEligibility {
      CREATE REQUIRED LINK sysEligibility: sys_core::SysEligibility {
          ON TARGET DELETE ALLOW;
          SET REQUIRED USING (<sys_core::SysEligibility>{});
      };
  };
};
