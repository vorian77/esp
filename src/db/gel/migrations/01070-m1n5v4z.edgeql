CREATE MIGRATION m1n5v4z42kbqvjchwt4bqoiqja5wde5osrtyuwgykwexkznsjeb4ba
    ONTO m1x4ss6xulk3tanhrqcriwnfxrgel4ktmgxgqs36y75vvcbbd6xv5q
{
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE MULTI PROPERTY fieldListItemsParmValueList: std::str;
  };
};
