CREATE MIGRATION m1ra6gtsl6caouua4qnqqsqdh7n6an25hycqnhyvidkaqhobt2zmla
    ONTO m1qlq6folbfqtrgbqhjuiiynyfra65pg3k2cnllkmmxrtfgelezxgq
{
              ALTER TYPE sys_core::SysDataObjColumn {
      DROP PROPERTY dbDataSourceKey;
  };
};
