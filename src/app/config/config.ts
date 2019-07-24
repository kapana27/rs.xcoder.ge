export  const Config = {
  baseURI: '',
  operations: {
    property: {
      get:{
        data: '/api/secured/Item/Section/In/Select',
        in: '/api/secured/Item/Section/In/Select',
        out: '/api/secured/Item/Section/Out/Select',
        list: '/api/secured/Item/Select',
      }
    }
  },
  itemTypes: {
    get: {
        types:'/api/secured/ItemType/Select'
    }
  },
  itemStatus: {
    get: {
        types:'/api/secured/ItemStatus/Select'
    }
  },
  transfer:{
    post:{
        transfer: '/api/secured/Item/Stock/Transfer',
        section: '/api/secured/Item/Section/Transfer',
        person: '/api/secured/Item/Person/Transfer',

    },
    get:{

    }
  },
  List: {
      get:{
        attachments: '/api/secured/Document/Attachments',
        itemFilterByName: '/api/secured/Item/Filter/ByName',
        MeasureUnit: '/api/secured/MeasureUnit/List',
        barcode: '/api/secured/List/BarCode/Select',
        ItemGroup: '/api/secured/ItemGroup/Select',
        marker: '/api/secured/List/Maker/Filter',
        supplier: '/api/secured/Supplier/Filter',
        model: '/api/secured/List/Model/Filter',
        stock:'/api/secured/stock/Select',
        rooms: '/api/secured/Item/Building/Rooms',
        structuralUnits: '/api/secured/StructuralUnit/Levels/Select',
        list: '/api/secured/List/Select',
        StructuralUnitTree:'/api/secured/StructuralUnit/Select?node=root',
        staffByDepartment: '/api/secured/Staff/Select',
        measureUnitTree: '/api/secured/MeasureUnit/Select',
        StructuralUnitLevel: '/api/secured/StructuralUnitLevel/List',
        StructuralUnitLevelGrid: '/api/secured/StructuralUnit/Select/Grid',
        roles: '/api/secured/Staff/Roles',
        cities: '/api/secured/StructuralUnit/City/Select',
        building: '/api/secured/StructuralUnit/City/Building/Select',
        positions: '/api/secured/List/Position/Select',
        employee: '/api/secured/Staff/Select_Edit',
        deleteEmployee: '/api/secured/Staff/Delete',
        deleteFile: '/api/secured/Document/Delete'
      },
      post:{
        lastBarCode: '/api/secured/List/BarCode/Get/LastCode',
        marker:'/api/secured/List/Maker/Insert',
        supplier:'/api/secured/Supplier/Insert',
        model:'/api/secured/List/Model/Insert',
        freeCodes: '/api/secured/List/BarCode/Get/FreeCodes',
        property: '/api/secured/Staff/Filter/ByStock',
        staff: '/api/secured/Staff/Filter/ByName/V2',
        stock: '/api/secured/Item/Stock/Change',
        addon: '/api/secured/Item/Addon',
        invoice: '/api/secured/Item/Stock/Change',
        return: '/api/secured/Item/Stock/Return',
        section: '/api/secured/Item/Section/Transfer',
        structuralUnit: '/api/secured/StructuralUnit/Insert/Row',
        employee: '/api/secured/Staff/Insert',
        updateEmployee: '/api/secured/Staff/Update',
      }
  },
  inventory:{
    post:{
      insert: "/api/secured/Item/Insert",
      update: "/api/secured/Item/Update",
      multiUpdate: "/api/secured/Item/Multi_Update",
    }
  },
  cart:{
    post:{
      put:"/api/secured/internal/session/put",
      getAll: "/api/secured/internal/session/getAll",
      remove: "/api/secured/internal/session/remove",
      clear: "/api/secured/internal/session/clear",
    }
  },
  massage: {
    get: {
      list: '/api/secured/Item/Inbox/Select',
      selectedList: '/api/secured/Item/Inbox/Detail/Select',
      inbox: '/api/secured/Item/Inbox/Income'
    },
    post: {
      NotApprove: '/api/secured/Item/Inbox/NotApprove',
      Approve: '/api/secured/Item/Inbox/Approve'
    }
  },
  dictionary:{
      post:{
        stock: '/api/secured/stock/Insert',
        list: {
          new: '/api/secured/List/Insert',
          edit: '/api/secured/List/Update'
        },
        ItemType:{
           new: '/api/secured/ItemType/Insert' ,
           edit: '/api/secured/ItemType/Update' ,
           delete: '/api/secured/ItemType/Delete' ,
        },
        ItemStatus:{
          new: '/api/secured/ItemStatus/Insert' ,
          edit: '/api/secured/ItemStatus/Update' ,
          delete: '/api/secured/ItemStatus/Delete' ,
        },
        Stock:{
          new: '/api/secured/stock/Insert' ,
          edit: '/api/secured/stock/Update' ,
          delete: '/api/secured/stock/Delete' ,
        },
        MeasureUnit:{
          new: '/api/secured/MeasureUnit/Insert' ,
          edit: '/api/secured/MeasureUnit/Update' ,
          delete: '/api/secured/MeasureUnit/Delete' ,
        },
        ItemGroup:{
          new: '/api/secured/ItemGroup/Insert' ,
          edit: '/api/secured/ItemGroup/Update' ,
          delete: '/api/secured/ItemGroup/Delete' ,
        },
        StructuralUnit:{
          new: '/api/secured/StructuralUnit/Insert/Row' ,
          edit: '/api/secured/StructuralUnit/Update/Row' ,
          delete: '/api/secured/StructuralUnit/Delete/Row' ,
        },
        delete: '/api/secured/List/Delete'
      },
      get:{}
  }

};
