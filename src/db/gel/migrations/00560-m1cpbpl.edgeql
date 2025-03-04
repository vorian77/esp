CREATE MIGRATION m1cpbpld5gsks4xe2shzh3nci4mrohi7si7l74xcpftwq5kay2heua
    ONTO m1hq2245qc64atvq67l75iwo5c7lsqzqatwrtvttimklpzh5ugpo7a
{
              ALTER TYPE sys_user::SysUserPref {
      CREATE CONSTRAINT std::exclusive ON (.idFeature);
  };
};
