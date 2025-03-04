CREATE MIGRATION m1u6uwzptbmdqk2lqr4klikw6nzlnxvxu3usteivzmfch56x2pzcnq
    ONTO m1ztd3y5sdnvwipxguhant35imyf5wgdgi3ccgcxtwgw6fhmeyhmua
{
              ALTER TYPE sys_core::SysDataObj {
      CREATE LINK codeListEditPresetType: sys_core::SysCode;
  };
};
