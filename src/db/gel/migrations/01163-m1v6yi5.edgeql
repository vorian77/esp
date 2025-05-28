CREATE MIGRATION m1v6yi5bhrfstktwjx7nly7sqqidpx5el2ixcn5y5zotcgpgtsdizq
    ONTO m1k7aube7ifz6voqybivxjojo5aif4lekdkoipuhc622stoo7bpioq
{
  ALTER TYPE sys_core::ObjRootCore {
      ALTER PROPERTY name {
          RESET OPTIONALITY;
      };
  };
};
