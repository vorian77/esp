CREATE MIGRATION m1qlq6folbfqtrgbqhjuiiynyfra65pg3k2cnllkmmxrtfgelezxgq
    ONTO m16ekdgv5qdk6vmzvrdlxzkkj6idw3w4vgdkpfnettk3kuf5szpjua
{
              ALTER TYPE sys_core::SysDataObjListEditDataMapItem {
      CREATE PROPERTY hasItems: std::bool;
  };
  ALTER TYPE sys_core::SysDataObjListEditDataMapItem {
      DROP PROPERTY orderDisplay;
  };
};
