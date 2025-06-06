import { Button } from '@nextui-org/react'

const Pricing = () => {
  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="flex flex-col justify-center content-center mx-auto max-w-5xl px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Simple Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {[
            { name: "Basic", price: "Free", features: ["Unlimited notes", "Basic todo lists", "5 custom tags", "1 GB storage"] },
            { name: "Pro", price: "$9.99/month", features: ["Everything in Basic", "Advanced todo features", "Unlimited custom tags", "10 GB storage", "Priority support"] },
            { name: "Team", price: "$19.99/month", features: ["Everything in Pro", "Team collaboration", "Admin controls", "100 GB storage", "API access"] }
          ].map((plan, index) => (
            <div key={index} className={"hover:border-purple-500 border-2 p-4 bg-background rounded-md"}>
              <div>
                <h1>{plan.name}</h1>
                <span className="text-2xl font-bold">{plan.price}</span>
              </div>
              <div>
                <ul className="space-y-2">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center">
                      <i className="ri-check-line mr-2 h-4 w-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-4 bg-black rounded-sm text-white">Choose Plan</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing
