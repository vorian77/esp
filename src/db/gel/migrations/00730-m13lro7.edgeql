CREATE MIGRATION m13lro7dc33w7ja7dm6kouqo7oisd3uu3yje4k2zefmdeuabeubkkq
    ONTO m1emzdvn3rnvb57eca4v3a3hdcsoatgeuqgct7dbgusukvlphyqgba
{
              ALTER TYPE sys_rep::SysRepUserParm {
      ALTER LINK parm {
          ON TARGET DELETE DELETE SOURCE;
      };
  };
};
