CREATE MIGRATION m1jd6xskrkhms5ubrgekucelee3i4e7zipxj4dutlly7cix74oiquq
    ONTO m1wc5wvqmves2dijr7gpaxhw4vojgbxjmlnr3ahy3fg6uprqadqazq
{
          ALTER TYPE sys_core::SysDataObjFieldListItemsProp {
      CREATE REQUIRED PROPERTY key: std::str {
          SET REQUIRED USING (<std::str>{});
      };
  };
};
