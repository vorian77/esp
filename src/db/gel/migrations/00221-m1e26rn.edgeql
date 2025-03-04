CREATE MIGRATION m1e26rn4crm2n4frujnhw5yypdhsbivkhv7ntnhfitl5izibw44loq
    ONTO m1wzustbfs7shhhlhnwiz5nucnlmibbr57whycnrp3ysrslunq3ykq
{
                              ALTER TYPE sys_core::SysDataObjColumn {
      DROP PROPERTY link;
  };
  DROP TYPE sys_core::SysDataObjFieldLink;
  DROP TYPE sys_core::SysDataObjFieldLinkJoin;
};
