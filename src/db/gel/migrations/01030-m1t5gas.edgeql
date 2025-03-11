CREATE MIGRATION m1t5gashigyx7bt2jp6kd4jh5tr4hlofyeqi3wqfko326l5qybjgtq
    ONTO m1yqvmb4adahbalor3sfoyuhtzrdqxq4pljp6ocd5eepex2r65emrq
{
  ALTER TYPE sys_core::SysDataObj {
      DROP LINK codeDoQueryOwnerType;
  };
};
