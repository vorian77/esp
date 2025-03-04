CREATE MIGRATION m1wc5wvqmves2dijr7gpaxhw4vojgbxjmlnr3ahy3fg6uprqadqazq
    ONTO m1hrsmg2tlmqdbebfqzoskvssbbftn2qydroygg6bnizauhp4oioxq
{
          ALTER TYPE sys_core::SysDataObjFieldListItems {
      ALTER LINK propsNew {
          RENAME TO props;
      };
  };
};
