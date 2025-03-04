CREATE MIGRATION m1sc7w4tyggjaxp3hzgyevnyqskyhigdzltk7r4kzemntcmqlxjhnq
    ONTO m1i6a2zot7mcdavwfzlob5hbrbq3q553lp4zrtvdzjdgw7z6iwpnia
{
                              ALTER TYPE sys_core::SysDataObjColumn {
      CREATE MULTI LINK linkColumns: sys_db::SysColumn;
  };
};
