CREATE MIGRATION m1vqxbppbuxn7su4cj5ilu76ye2maojn637p632abm574qbxe532zq
    ONTO m15zxhiqxonp7az3k4fhcmghotchphh3gmahbk6bvdascjbux6gbxq
{
  ALTER TYPE sys_core::SysSystem {
      ALTER LINK owner {
          RENAME TO ownerOrg;
      };
  };
};
