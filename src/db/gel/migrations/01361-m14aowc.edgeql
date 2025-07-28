CREATE MIGRATION m14aowccjhftgfknnjt6znyx4edr2yzkje4my3ue7u62fkohn5teva
    ONTO m13do5q7uk66ej67wjcq475nxz5rti3ltbijtvbmnzwkjetak52eoq
{
  ALTER TYPE sys_core::SysEligibilityNode {
      ALTER PROPERTY exprState {
          RESET OPTIONALITY;
      };
  };
};
