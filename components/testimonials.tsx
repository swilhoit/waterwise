import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "California",
    rating: 5,
    text: "We've cut our water bill by 60% since installing the Aqua2use system. Our garden has never looked better!",
    product: "Aqua2use GWDD"
  },
  {
    name: "Michael Chen",
    location: "Arizona",
    rating: 5,
    text: "Living in a drought-prone area, this system has been a game-changer. Easy installation and excellent support.",
    product: "Aqua2use Pro"
  },
  {
    name: "Emily Rodriguez",
    location: "Texas",
    rating: 5,
    text: "Perfect for our tiny home! Compact, efficient, and helps us live sustainably off-grid.",
    product: "Aqua2use GWDD"
  }
]

export function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied customers who are saving water and money
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover-lift transition-all duration-300 bg-white">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                  <p className="text-xs text-blue-600 mt-1">{testimonial.product}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}