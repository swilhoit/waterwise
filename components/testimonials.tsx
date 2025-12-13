import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

// Real customer testimonials from old site reviews
const testimonials = [
  {
    name: "Martin",
    location: "Aqua2use GWDD Owner",
    rating: 5,
    text: "I have had my Aqua2Use for about 5 years. It has performed flawlessly. I use grey water to water my flower beds.",
    product: "Aqua2use GWDD"
  },
  {
    name: "J.G.",
    location: "Aqua2use GWDD Owner",
    rating: 5,
    text: "GWDD System 5 years STILL working perfectly! Received a GWDD pump unit in 2020 and has been performing top notch ever since.",
    product: "Aqua2use GWDD"
  },
  {
    name: "Richard A.",
    location: "Arizona",
    rating: 5,
    text: "I have had the GWDD for 2 years now to help water my yard in Arizona. Works great in the desert climate.",
    product: "Aqua2use GWDD"
  }
]

export function Testimonials() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real reviews from verified Aqua2use owners
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 bg-white">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">"{testimonial.text}"</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                  <p className="text-xs text-emerald-600 mt-1">{testimonial.product}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
