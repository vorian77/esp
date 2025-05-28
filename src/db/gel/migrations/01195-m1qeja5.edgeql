CREATE MIGRATION m1qeja5jdffdanskpj57oyfahwc2mfirdjnje2putf2ba3tos55pfa
    ONTO m1uw663gf46ocokrc5t7hdw7p5zmgi6mql7mwosfj5nil6us36khjq
{
  ALTER TYPE sys_core::SysDataObjQueryRider {
      ALTER LINK codeUserDestination {
          RENAME TO codeDestinationType;
      };
  };
  ALTER TYPE sys_core::SysDataObjQueryRider {
      ALTER LINK nodeUserDestination {
          RENAME TO nodeDestination;
      };
  };
  ALTER TYPE sys_core::SysDataObjQueryRider {
      ALTER PROPERTY functionParmValue {
          RENAME TO parm;
      };
  };
  ALTER TYPE sys_user::SysUserAction {
      CREATE LINK codeDestinationType: sys_core::SysCode;
      CREATE LINK nodeDestination: sys_core::SysNodeObj {
          ON TARGET DELETE DELETE SOURCE;
      };
  };
};
