CREATE MIGRATION m1ndvbrejzawygnd7inmt57cnl6lyvavwbpqt2sw32csxdtgcffxya
    ONTO m1mrj5jwnloruxdljp5tupbdkmpjhsjlzqwndwbpbm55p7wqa5nkiq
{
              CREATE FUNCTION sys_core::getSystem(name: std::str) -> OPTIONAL sys_core::SysSystem USING (SELECT
      std::assert_single((SELECT
          sys_core::SysSystem
      FILTER
          (.name = name)
      ))
  );
};
