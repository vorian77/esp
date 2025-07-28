CREATE MIGRATION m1kgs5msglx6gsfn6tvww6tgii2yf25g5pzjf6uuuvr7hyujzefula
    ONTO m1h5evtu65c2yepcnfrpen3fqw6vcnia2qq66gvw6ompw54ps25zoq
{
  ALTER TYPE app_cm::CmCsfEligibility {
      DROP LINK nodeValues;
  };
  ALTER TYPE app_cm::CmCsfEligibility {
      CREATE REQUIRED PROPERTY nodeValues: std::json {
          SET REQUIRED USING (<std::json>{});
      };
  };
  DROP TYPE sys_core::SysEligibilityNodeValue;
};
