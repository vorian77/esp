CREATE MIGRATION m1utyxasioh3jlbhh5gtjturstdjgnaxqlvj2v6npuuo6gzaptjmbq
    ONTO m1f7pnk5nvnve3tk5y7fln2fipzmwj3bostz5nzbloirh6b6f63u7a
{
  ALTER TYPE sys_core::SysObjAttr {
      CREATE CONSTRAINT std::exclusive ON (.name);
  };
  ALTER TYPE sys_user::SysTask {
      ALTER CONSTRAINT std::exclusive ON (.name) {
          DROP OWNED;
      };
  };
  ALTER TYPE sys_user::SysUser {
      ALTER CONSTRAINT std::exclusive ON (.name) {
          SET OWNED;
      };
  };
};
