CREATE MIGRATION m16zlufv6i24uuu5lbocfybqgoomfd236z6fgmeioi3lwnzuiq577a
    ONTO m1zuqmrxec3d4m7ruseiz724emvz4qehi76suhhji4vvng2vhiba4q
{
  ALTER TYPE sys_user::SysUserParm {
      ALTER LINK codeType {
          RESET OPTIONALITY;
      };
      ALTER LINK user {
          RESET OPTIONALITY;
      };
      ALTER PROPERTY idFeature {
          RESET OPTIONALITY;
      };
      ALTER PROPERTY parmData {
          RESET OPTIONALITY;
      };
  };
};
