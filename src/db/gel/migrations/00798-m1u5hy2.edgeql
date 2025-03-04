CREATE MIGRATION m1u5hy27hibooq5mkdgcige6hin3oprv2tzyidw7yiqzh5sfd2rfsa
    ONTO m12f37ecofcw3i52k4zejywgp27gqjybc6gshcsxr25ivtyie7vnfa
{
          ALTER TYPE sys_rep::SysRepParm {
      DROP LINK linkTable;
  };
};
