CREATE MIGRATION m1k7aube7ifz6voqybivxjojo5aif4lekdkoipuhc622stoo7bpioq
    ONTO m1mrswytelxckmo2wjp32f4wodcfjgqa7mgh7bqk5s4wlgowx4gnva
{
  ALTER TYPE sys_core::ObjRootCore {
      ALTER PROPERTY name {
          SET REQUIRED USING (<std::str>{});
      };
  };
  ALTER TYPE default::SysPerson {
      DROP EXTENDING sys_core::ObjRootCore;
      EXTENDING sys_core::ObjRoot LAST;
  };
};
