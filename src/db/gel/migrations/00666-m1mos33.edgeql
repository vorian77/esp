CREATE MIGRATION m1mos33dk2rq3okpeu53tyk2vrzgubv3fhvmtv7qjgccpryiq7vaia
    ONTO m1m4y2cz27rqxmi7unqa3vj53heucqyzicpqs4ci7co24lgo5pekda
{
              ALTER TYPE sys_core::SysDataObj {
      CREATE PROPERTY isUserSelectedSystem: std::bool;
  };
  ALTER TYPE sys_core::SysDataObj {
      DROP PROPERTY userResourceSaveParmsSelected;
  };
};
