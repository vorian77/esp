CREATE MIGRATION m1iruhkudfpbsxhsdjfegog46q243qyxzsn52t63cvnalih6q7pqia
    ONTO m1ul44ynuai5tnj625o5ljr6wuz6ujog4m4wl3k6lnahevberrw37q
{
                  ALTER TYPE sys_core::SysDataObjFieldListSelect {
      DROP LINK dataObjSelect;
  };
};
