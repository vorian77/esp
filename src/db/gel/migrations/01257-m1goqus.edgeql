CREATE MIGRATION m1goqusda2qdmur2u5oavvn5angdpdaftg2refzlyvg6wg6mwwt4aq
    ONTO m1idt6umzwfube3cykpul5iuvvebmoempqrpbjnhphdwngkimdtdrq
{
  ALTER TYPE sys_user::SysUserParm {
      ALTER PROPERTY idFeature {
          SET TYPE std::int64 USING (<std::int64>{});
      };
  };
};
