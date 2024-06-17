CREATE MIGRATION m1t5v3dzpfnht3c7sqriwd3c4uivd4iltmjhwb6bxx7agr27okjyma
    ONTO m1csep4spholqdwqrpaiplh6k4q4hw5plfjbedbazw4ynqv4ednwva
{
  ALTER TYPE sys_core::SysDataObjTable {
      ALTER PROPERTY index {
          SET TYPE default::nonNegative USING (<default::nonNegative>.index);
      };
      ALTER PROPERTY indexParent {
          SET TYPE default::nonNegative USING (<default::nonNegative>.indexParent);
      };
  };
};
