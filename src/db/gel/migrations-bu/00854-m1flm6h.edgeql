CREATE MIGRATION m1flm6hhefrrvqa7yjvked5h2megbooj4upovzihw7xurcc7xf6hqa
    ONTO m1su52mb5dtm7q74mdql7t4xdkhfliyr6icyqxy7ac4umovon4pyra
{
  ALTER TYPE sys_core::ObjRoot {
      CREATE PROPERTY testsaj: std::str;
  };
};
