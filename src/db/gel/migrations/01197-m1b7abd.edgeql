CREATE MIGRATION m1b7abdzppvm5hqs7dvtbryx2sdnjh6zntuau272xovu3y5dvnhqnq
    ONTO m1paf6a2fs6odnojv4nyt2y663caz3rndxh3ns55zebfncywqtv2ia
{
  CREATE TYPE sys_core::SysNavDestination {
      CREATE REQUIRED LINK codeDestinationType: sys_core::SysCode;
      CREATE LINK nodeDestination: sys_core::SysNodeObj {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE PROPERTY backCount: std::int16;
  };
  ALTER TYPE sys_core::SysDataObjQueryRider {
      CREATE LINK navDestination: sys_core::SysNavDestination {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
  ALTER TYPE sys_user::SysUserAction {
      CREATE LINK navDestination: sys_core::SysNavDestination {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
};
