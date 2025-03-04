CREATE MIGRATION m1os32v5zubl7kxw7ml2osqcoep7o64elhro2zecwz4szblgnqi7oq
    ONTO m13fiif6wuqpct7wsgoadrawqjx4u22f6rg6miw2pq2tuolibc4r7q
{
                  CREATE TYPE sys_core::SysDataObjFieldListEdit EXTENDING sys_core::SysObj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE REQUIRED LINK dataObjList: sys_core::SysDataObj {
          ON SOURCE DELETE DELETE TARGET IF ORPHAN;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE LINK fieldListEdit: sys_core::SysDataObjFieldListEdit;
  };
};
