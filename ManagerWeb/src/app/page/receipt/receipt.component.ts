import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  public cart : any = []
  public totalPrice = 0
  public totalNumberOf = 0
  public date : any = ""

  constructor(
    private common : CommonService 
  ) {
    this.cart = this.common.cartService
  }

  ngOnInit(): void {
    this.cart.forEach(element => {
      this.totalPrice = this.totalPrice + element["price"]
      this.totalNumberOf = this.totalNumberOf + element["numberOf"]
    })

    let today = new Date();
    this.date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()
  }

  public generatePdf(cmd) {
    const documentDefinition = this.getDocumentDefinition();

    switch (cmd) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;
      default: pdfMake.createPdf(documentDefinition).open(); break;
    }
  }
  
  getDocumentDefinition() {
    return {
      content: [
        {
          text: 'HÓA ĐƠN BÁN LẺ',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        ////////////////////////////////////////////////////////////////////////////////////
        {
          columns: [
            [
              {
                text: "N20 Store",
                style: 'header',
              }, {
                text: "Địa chỉ: 303, Tổ 13, Kiến Hưng 2, Kiến Thành, Chợ Mới, An Giang"
              }, {
                text: "Liên hệ: 0393188382",
              }, {
                text: "Email: ngonhu159@gmail.com",
              }, {
                text: "Fanpage: facebook.com/N20Shop (N20 Store)",
                link: "https://www.facebook.com/N20Shop",
              }
            ],
          ]
        },
        ////////////////////////////////////////////////////////////////////////////////////
        {
          text: 'Chi tiết đơn hàng',
          style: 'header',
        },
        this.Get_List_Product(),
        ////////////////////////////////////////////////////////////////////////////////////
        {
          text: 'Hình thức thanh toán',
          style: 'header',
        },
        {
          text: 'Chuyển khoản',
        },
        ////////////////////////////////////////////////////////////////////////////////////
        {
          text: 'Thông tin người nhận',
          style: 'header',
        },
        {
          text: 'Nguyễn Văn B, 19/14 Tân Sơn, P.12, Q.Gò Vấp, TP.Hồ Chí Minh. SĐT: 03931883xx'
        },
        ////////////////////////////////////////////////////////////////////////////////////
        {
          text: 'Người lập hóa đơn',
          style: 'sign'
        },
        {
          columns : [
              { qr: "N20 Store - SĐT: 0393188382 - FB: https://www.facebook.com/N20Shop", fit: 100 },
              {
                text: "NV. Nguyễn Văn A",
                alignment: 'right',
              }
          ]
        }
      ],
      info: {
        title: "N20 Store" + '_Recipt',
        author: "Ngo Quoc Nhu",
        subject: 'Receipt',
        keywords: 'RECEIPT, ONLINE RECEIPT',
      },
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 20, 0, 10],
          },
          name: {
            fontSize: 16,
            bold: true
          },
          jobTitle: {
            fontSize: 14,
            bold: true,
            italics: true
          },
          sign: {
            margin: [0, 50, 0, 10],
            alignment: 'right',
            italics: true
          },
          tableHeader: {
            bold: true,
            alignment: 'center'
          },
          tableBody: {
            // nothing
          },
          tableBodyCenter: {
            alignment: 'center'
          },
          tableBodyCenterTotal : {
            colspan: 4,
            alignment: 'center',
            bold: true
          }
        }
    };
  }

  public Get_List_Product() {
    const list = [];
    list.push([
      {
        text: 'STT',
        style: 'tableHeader'
      },
      {
        text: 'Tên sản phẩm',
        style: 'tableHeader'
      },
      {
        text: 'Số lượng',
        style: 'tableHeader'
      },
      {
        text: 'Đơn giá',
        style: 'tableHeader'
      },
      {
        text: 'Thành tiền',
        style: 'tableHeader'
      }
    ])
    let index = 0;
    this.cart.forEach(element => {
      index = index + 1
      list.push([
        {
          text: index,
          style: 'tableBodyCenter'
        },
        {
          text: element["name"],
          style: 'tableBody'
        },
        {
          text: element["numberOf"],
          style: 'tableBodyCenter'
        },
        {
          text: element["price"],
          style: 'tableBodyCenter'
        },
        {
          text: element["price"] * element["numberOf"],
          style: 'tableBodyCenter'
        }
      ])
    })
    list.push([
      {
        text: "",
        style: 'tableBodyCenterTotal'
      },
      {
        text: "",
        style: 'tableBodyCenterTotal'
      },
      {
        text: "",
        style: 'tableBodyCenterTotal'
      },
      {
        text: "Tổng",
        style: 'tableBodyCenterTotal'
      },
      {
        text: this.totalPrice,
        style: 'tableBodyCenter'
      },
    ])
    return {
      table: {
        widths: ['10%', '30%', '20%', '20%', '20%'],
        body : [
          ...list
        ]
      }
    }
  }

}
