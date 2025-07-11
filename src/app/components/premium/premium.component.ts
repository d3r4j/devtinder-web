import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-premium',
  templateUrl: './premium.component.html',
  styleUrls: ['./premium.component.css']
})
export class PremiumComponent implements OnInit {

  constructor(private service: LoginService) { }

  order: any = {}
  premiumUserData: any;
  setUserPremium: boolean = false;

  ngOnInit(): void {
    this.verifyPremiumUser()
  }
  verifyPremiumUser() {
    this.service.premiumVerify().subscribe({
      next: (res) => {
        this.premiumUserData = res
        console.log(this.premiumUserData)
        if (this.premiumUserData.isPremium == true) {
          this.setUserPremium = true;
        }
      },
      error: (err) => {
        console.log("user premium verify failed", err)
      }
    })
  }
  onClickBuy(data: string) {
    this.service.createOrder(data).subscribe({
      next: (res) => {
        this.order = res;
        console.log("order response", this.order)
        console.log("crate order api loaded successfully", res)

        // opening razorpay page for payment


        // Open Razorpay Checkout
        const options = {
          key: this.order.keyId, // Replace with your Razorpay key_id
          amount: this.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: this.order.currency,
          name: "CODE SEEKERS",
          description: 'Test Transaction',
          order_id: this.order.orderId, // This is the order_id created in the backend
          prefill: {
            name: this.order.firstName + this.order.lastName,
            email: this.order.emailId,
            contact: '9999999999'
          },
          theme: {
            color: '#F37254'
          },
          handler: this.verifyPremiumUser.bind(this),
        };



        const rzp = new (window as any).Razorpay(options);
        rzp.open(); // this opens razorpay page for payment




      },
      error: (err) => {
        console.log("error in creating order api", err)
      }
    })
  }



} 
