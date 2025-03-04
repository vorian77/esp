CREATE MIGRATION m1i6a2zot7mcdavwfzlob5hbrbq3q553lp4zrtvdzjdgw7z6iwpnia
    ONTO m1kngvbfs7ijc4bfh6h6czde5engcke225gr4ocvz23zhbxejdylha
{
                              ALTER TYPE sys_core::SysDataObjColumn {
      DROP LINK linkColumns;
  };
};
